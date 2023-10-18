const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passport = require("passport");
const fs = require("fs");
const NaverStrategy = require("passport-naver").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");

// secret.json 파일 읽기
const secretData = fs.readFileSync("../secret.json");
const secrets = JSON.parse(secretData);

// Naver 클라이언트 ID와 시크릿         process.env.
const NAVER_CLIENT_ID = secrets.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = secrets.NAVER_CLIENT_SECRET;

// Google 클라이언트 ID와 시크릿
const GOOGLE_CLIENT_ID = secrets.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = secrets.GOOGLE_CLIENT_SECRET;

// Kakao 클라이언트 ID와 시크릿
const KAKAO_CLIENT_ID = secrets.KAKAO_CLIENT_ID;
const KAKAO_CLIENT_SECRET = secrets.KAKAO_CLIENT_SECRET;

// // Facebook 클라이언트 ID와 시크릿
// const FACEBOOK_APP_ID = secrets.FACEBOOK_APP_ID;
// const FACEBOOK_APP_SECRET = secrets.FACEBOOK_APP_SECRET;

// MySQL 정보
const MYSQL_HOSTNAME = secrets.Mysql_Hostname;
const MYSQL_PORT = secrets.Mysql_Port;
const MYSQL_USERNAME = secrets.Mysql_Username;
const MYSQL_PASSWORD = secrets.Mysql_Password;
const MYSQL_DBNAME = secrets.Mysql_DBname;

// MySQL 연결 설정
const pool = mysql.createPool({
  host: MYSQL_HOSTNAME,
  port: MYSQL_PORT,
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DBNAME,
});

// MySQL 연결 풀에 대한 프라미스 래퍼
const promisePool = pool.promise();

// db session store options
const options = {
  host: MYSQL_HOSTNAME,
  port: MYSQL_PORT,
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DBNAME,
};

// mysql session store 생성
const sessionStore = new MySQLStore(options, pool);

const app = express();
// const server = http.createServer(app);
const PORT = 3000;

app.use(cookieParser());

app.use(express.json());

// express session 연결
app.use(
  session({
    secret: "secret key",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
  })
);

const corsOptions = {
  origin: [
    "http://awsforestcamp.kro.kr",
    "http://awsforestcamp.kro.kr:3000",
    "http://awsforestcamp.kro.kr:8000",
    "http://13.125.151.237:8000",
    "http://localhost:8000",
    "http://13.209.180.103:8000",
    "http://43.200.73.25:8000",
    "http://43.200.73.25:3000",
    "http://13.209.180.103:3000",
    "http://3.37.199.29:3000",
  ],
  credentials: true, // 쿠키를 전송하려면 이 설정이 true이어야 함
};

app.use(cors(corsOptions));

// passport 초기화 및 session 연결
app.use(passport.initialize());
app.use(passport.session());

// JWT 설정
const jwtOptions = {
  secretOrKey: "your_secret_key", // 비밀 키
};

// Naver login
passport.use(
  new NaverStrategy(
    {
      clientID: NAVER_CLIENT_ID,
      clientSecret: NAVER_CLIENT_SECRET,
      callbackURL: "http://awsforestcamp.kro.kr:3000/auth/naver/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("Naver Login Profile:", profile);
      try {
        // 사용자 정보를 데이터베이스에 저장하는 작업
        const [rows, fields] = await promisePool.query(
          `INSERT INTO users (id, name, email)
           VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE name = ?, email = ?;`,
          [
            profile.id,
            profile.displayName,
            profile.emails[0].value,
            profile.displayName,
            profile.emails[0].value,
          ]
        );
        // console.log("Naver profile object:", JSON.stringify(profile, null, 2));

        console.log("Success saving user.");
        // JWT 토큰 발급
        const token = jwt.sign({ id: profile.id }, jwtOptions.secretOrKey);
        console.log("JWT token generated:", token);
        return done(null, profile, token);
      } catch (err) {
        console.error("Error saving user:", err);
        return done(err, null);
      }
    }
  )
);

// Naver 로그인 화면
app.get("/auth/naver", passport.authenticate("naver"));

app.get(
  "/auth/naver/callback",
  passport.authenticate("naver", {
    failureRedirect: "/login",
  }),
  // 로그인 성공 후 리다이렉트
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, platform: req.user.platform },
      jwtOptions.secretOrKey
    );
    // 쿠키에 토큰을 설정
    res.cookie("auth_token", token);
    // 쿠키에 이메일 정보도 추가
    res.cookie("email", req.user.emails[0].value, { encode: String });
    res.redirect("http://awsforestcamp.kro.kr/");
  }
);

// Google login
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://awsforestcamp.kro.kr:3000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log("Google Login Profile:", profile);
      try {
        // 사용자 정보를 데이터베이스에 저장하는 작업
        const [rows, fields] = await promisePool.query(
          `INSERT INTO users (id, name, email)
           VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE name = ?, email = ?;`,
          [
            profile.id,
            profile.displayName,
            profile.email,
            profile.displayName,
            profile.email,
          ]
        );
        console.log("Success saving user.");
        // JWT 토큰 발급
        const token = jwt.sign({ id: profile.id }, jwtOptions.secretOrKey);
        console.log("JWT token generated:", token);
        return done(null, profile);
      } catch (err) {
        console.error("Error saving user:", err);
        return done(err, null);
      }
    }
  )
);

// google login 화면
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  // 로그인 성공 후 리다이렉트
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, platform: req.user.platform },
      jwtOptions.secretOrKey
    );
    // 쿠키에 토큰과 플랫폼을 설정
    res.cookie("auth_token", token);
    // 쿠키에 이메일 정보도 추가
    res.cookie("email", req.user.email, { encode: String });
    res.redirect("http://awsforestcamp.kro.kr");
  }
);

// 카카오 로그인
passport.use(
  new KakaoStrategy(
    {
      clientID: KAKAO_CLIENT_ID,
      clientSecret: KAKAO_CLIENT_SECRET,
      callbackURL: "http://awsforestcamp.kro.kr:3000/auth/kakao/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("Kakao Login Profile:", profile);
      try {
        // 사용자 정보를 데이터베이스에 저장하는 작업
        const [rows, fields] = await promisePool.query(
          `INSERT INTO users (id, name, email)
           VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE name = ?, email = ?;`,
          [
            profile.id,
            profile._json.kakao_account.profile.nickname,
            profile._json.kakao_account.email,
            profile._json.kakao_account.profile.nickname,
            profile._json.kakao_account.email,
          ]
        );
        console.log("Success saving user.");
        // JWT 토큰 발급
        const token = jwt.sign({ id: profile.id }, jwtOptions.secretOrKey);
        console.log("JWT token generated:", token);
        return done(null, profile, token);
      } catch (err) {
        console.error("Error saving user:", err);
        return done(err, null);
      }
    }
  )
);

// 카카오 로그인 라우트
app.get("/auth/kakao", passport.authenticate("kakao"));

app.get(
  "/auth/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/login",
  }),
  // 로그인 성공 후 리다이렉트
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, platform: req.user.platform },
      jwtOptions.secretOrKey
    );
    // 쿠키에 토큰과 플랫폼을 설정
    res.cookie("auth_token", token);
    // 쿠키에 이메일 정보도 추가
    res.cookie("email", req.user._json.kakao_account.email, { encode: String });
    res.redirect("http://awsforestcamp.kro.kr");
  }
);

app.get("/mypage", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // 여기에서 인증된 사용자 정보를 사용할 수 있습니다.
  const { id, displayName, email } = req.user;

  const userData = {
    id,
    displayName,
    email,
  };

  res.json(userData);
});

// login이 최초로 성공했을 때만 호출되는 함수
// 사용자의 ID 외에 displayName과 email도 세션에 저장
passport.serializeUser(function (user, done) {
  // console.log("Serializing user:", user);
  const userData = {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
  };
  done(null, userData);
});

// 사용자가 페이지를 방문할 때마다 호출되는 함수
// deserializeUser를 이용해 사용자의 ID를 세션에서 찾아 사용자 정보를 복구
passport.deserializeUser(async function (userData, done) {
  // console.log("Deserializing user:", userData);
  try {
    if (!userData.id) {
      // ID가 없는 경우 빈 사용자 정보로 처리
      const emptyUser = {
        id: null,
        displayName: null,
        email: null,
      };
      return done(null, emptyUser);
    }

    // 데이터베이스에서 사용자 정보 조회
    const [rows, fields] = await promisePool.query(
      "SELECT * FROM users WHERE id = ?",
      [userData.id]
    );

    if (rows.length === 0) {
      // 해당 ID에 해당하는 사용자 정보가 없는 경우
      // 기존에 저장된 정보를 하드코딩하지 않고, 빈 사용자 정보를 세션에 저장
      const emptyUser = {
        id: userData.id,
        displayName: null,
        email: null,
      };
      return done(null, emptyUser);
    }

    // 조회한 사용자 정보를 세션에 저장
    const user = {
      id: rows[0].id,
      displayName: rows[0].name,
      email: rows[0].email,
    };
    done(null, user);
  } catch (err) {
    console.error("Error:", err);
    done(err, null);
  }
});

// logout
app.get("/logout", (req, res) => {
  // 토큰 삭제
  res.clearCookie("auth_token");
  res.clearCookie("email");
  req.logout(function (err) {
    if (err) {
      console.error("Error logging out:", err);
      return res.sendStatus(500);
    }
    res.redirect("http://awsforestcamp.kro.kr");
  });
});

app.get("/camp/favor/", async (req, res) => {
  const authToken = req.cookies["auth_token"];
  console.log(authToken);
  console.log(req.cookies);
  if (!authToken) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(authToken, "your_secret_key");
    const userid = decoded.id;
    const { campnum } = req.query;
    console.log("userid : ", userid);
    console.log("campnum : ", campnum);
    console.log(decoded);
    var [rows1] = await promisePool.query(
      "SELECT * FROM campfavor WHERE userid = ? AND campnum = ?",
      [userid, campnum]
    );
    console.log(userid, campnum);
    console.log(rows1);

    res.status(200).json({ ok: "ok", rows: rows1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/camp/favoruser/", async (req, res) => {
  const authToken = req.cookies["auth_token"];
  console.log(authToken);
  console.log(req.cookies);
  if (!authToken) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(authToken, "your_secret_key");
    const userid = decoded.id;
    console.log("userid : ", userid);
    var [rows1] = await promisePool.query(
      "SELECT * FROM campfavor WHERE userid = ?",
      [userid]
    );
    console.log(rows1);

    res.status(200).json({ ok: "ok", rows: rows1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/campstore/favoruser/", async (req, res) => {
  const authToken = req.cookies["auth_token"];
  console.log(authToken);
  console.log(req.cookies);
  if (!authToken) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(authToken, "your_secret_key");
    const userid = decoded.id;
    console.log("userid : ", userid);
    var [rows1] = await promisePool.query(
      "SELECT * FROM equipmentfavor WHERE userid = ?",
      [userid]
    );
    console.log(rows1);

    res.status(200).json({ ok: "ok", rows: rows1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/campstore/favor/:imgid", async (req, res) => {
  const authToken = req.cookies["auth_token"];
  // console.log(authToken);
  // console.log(req.cookies);
  if (!authToken) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(authToken, "your_secret_key");
    const userid = decoded.id;
    const equipmentnum = req.params.imgid;
    console.log("userid : ", userid);
    console.log("equipmentnum : ", equipmentnum);
    // console.log(decoded);
    var [rows2] = await promisePool.query(
      "SELECT * FROM equipmentfavor WHERE userid = ? AND equipmentnum = ?",
      [userid, equipmentnum]
    );
    // console.log(userid, equipmentnum);
    console.log(rows2);

    res.status(200).json({ ok: "ok", rows: rows2 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// campfavor에 추가
// 바꿔주세요 행위가 들어가면 안된답니다. REST FULL 한 API는요.
// app.post("/add/campfavor", async (req, res) => {
app.post("/camp/favor/", async (req, res) => {
  const authToken = req.cookies["auth_token"];
  console.log(authToken);
  if (!authToken) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(authToken, "your_secret_key");
    const userid = decoded.id;
    const { campnum } = req.body;
    console.log("campnum : ", userid);
    console.log("1campnum : ", campnum);
    await promisePool.query(
      "INSERT INTO campfavor (userid, campnum) VALUES (?, ?)",
      [userid, campnum]
    );

    res.status(200).json({ message: "Successfully added to campfavor" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// campfavor에서 삭제
// app.delete("/delete/campfavor", async (req, res) => {
app.delete("/camp/favor", async (req, res) => {
  const authToken = req.cookies["auth_token"];

  if (!authToken) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(authToken, "your_secret_key");
    const userid = decoded.id;
    const { campnum } = req.body;
    console.log("campnum : ", userid);
    console.log("2campnum : ", campnum);
    await promisePool.query(
      "DELETE FROM campfavor WHERE userid = ? AND campnum = ?",
      [userid, campnum]
    );
    res.status(200).json({ message: "Successfully removed from campfavor" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// equipmentfavor에 추가
app.post("/campstore/equipmentfavor", async (req, res) => {
  const authToken = req.cookies["auth_token"];
  // console.log("여기다!!");
  // console.log("authToken : ", authToken);
  if (!authToken) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(authToken, "your_secret_key");
    var userid = decoded.id;
    var { equipmentnum } = req.body;
    console.log("equipmentnum : ", equipmentnum);

    equipmentnum = equipmentnum.trim();
    userid = userid.trim();

    console.log(equipmentnum);
    console.log(userid);
    await promisePool.query(
      "INSERT INTO equipmentfavor (userid, equipmentnum) VALUES (?, ?)",
      [userid, equipmentnum]
    );
    res.status(200).json({ message: "Successfully added to equipmentfavor" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// equipmentfavor에서 삭제
app.delete("/campstore/equipmentfavord", async (req, res) => {
  const authToken = req.cookies["auth_token"];
  console.log("authToken : ", authToken);
  if (!authToken) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(authToken, "your_secret_key");
    var userid = decoded.id;
    var { equipmentnum } = req.body;

    // equipmentnum = equipmentnum.trim()
    // userid = userid.trim()

    console.log(equipmentnum);
    console.log(userid);
    console.log("여깄다.");

    await promisePool.query(
      "DELETE FROM equipmentfavor WHERE userid = ? AND equipmentnum = ?",
      [userid, equipmentnum]
    );
    res
      .status(200)
      .json({ message: "Successfully removed from equipmentfavor" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/campstore/search_favor", async (req, res) => {
  try {
    console.log("아");
    var [rows2] = await promisePool.query(
      "SELECT equipmentnum, count(*) as count FROM equipmentfavor group by equipmentnum order by count(*) desc"
    );
    console.log(rows2);

    res.status(200).json({ ok: "ok", rows: rows2 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/camp/search_favor", async (req, res) => {
  try {
    console.log("아");
    var [rows2] = await promisePool.query(
      "SELECT campnum, count(*) as count FROM campfavor group by campnum order by count(*) desc"
    );
    console.log(rows2);

    res.status(200).json({ ok: "ok", rows: rows2 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
