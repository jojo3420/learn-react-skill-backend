
const { ADMIN_PWD: adminPwd } = process.env;

exports.login = (ctx) => {
    const { password } = ctx.request.body;
    // console.log(adminPwd, password);
    if (adminPwd === password) {
        ctx.body = {
            success: true,
        };
        // 로그인 성공시 세션에 logged 값을 설정 한다. 
        ctx.session.logged = true;
    } else {
        ctx.body = {
            success: false,
        };
        ctx.status = 401; // Unauthorized 
    }
};

exports.logout = (ctx) => {
    ctx.session = null;
    ctx.status = 200;
    ctx.body = {
        logout: 'success'
    };
};

exports.check = (ctx) => {
    ctx.body = {
        logged: !!ctx.session.logged,
    };
};
