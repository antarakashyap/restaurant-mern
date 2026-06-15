import jwt from "jsonwebtoken";
export const protect=(req,res,next)=>{
    console.log("Cookies:", req.cookies);
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Not Authorized",success:false})
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid token"});
    }

//     try {

//     const decoded = jwt.verify(
//         token,
//         process.env.JWT_SECRET
//     );

//     console.log("Decoded Token:", decoded);
//     console.log("ENV Admin:", process.env.ADMIN_EMAIL);

//     if (
//         decoded.email !== process.env.ADMIN_EMAIL
//     ) {
//         return res.status(401).json({
//             message: "Not Authorized",
//             success: false
//         });
//     }

//     req.admin = decoded;

//     next();

// } catch (error) {
//     return res.status(401).json({
//         message: "Invalid token",
//         success: false
//     });
// }
// }


// export const protect = (req, res, next) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({
//             message: "Not Authorized",
//             success: false
//         });
//     }

//     try {
//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );

//         req.user = decoded;

//         next();

//     } catch (error) {
//         return res.status(401).json({
//             message: "Invalid token",
//             success: false
//         });
//     }
// };

export const adminOnly=(req,res,next)=>{
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Not Authorized",
            success:false
        });
    }

    try {

        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if(
            decoded.email !== process.env.ADMIN_EMAIL
        ){
            return res.status(401).json({
                message:"Not Authorized",
                success:false
            });
        }

        req.admin = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message:"Invalid token",
            success:false
        });
    }
}

// export const adminOnly = (req, res, next) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({
//             message: "Not Authorized",
//             success: false
//         });
//     }

//     try {
//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );

//         if (
//             decoded.email !== process.env.ADMIN_EMAIL
//         ) {
//             return res.status(401).json({
//                 message: "Not Authorized",
//                 success: false
//             });
//         }

//         req.admin = decoded;

//         next();

//     } catch (error) {
//         return res.status(401).json({
//             message: "Invalid token",
//             success: false
//         });
//     }
//