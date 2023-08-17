export const SITE_NAME = "Eloquint Art"

// export const BASE_URL = "https://dev74.onlinetestingserver.com:4001/api"
// export const UPLOAD_URL = "https://dev74.onlinetestingserver.com:4001/"

export const BASE_URL = "http://localhost:3004/api"
export const UPLOAD_URL = "http://localhost:3004/Uploads/"



export const AUTH = {
    signin: "/admin/auth/signin",
    logout: "/auth/logout",
    emailCode:"/admin/auth/emailVerificationCode",
    verifyCode:"/admin/auth/verifyRecoverCode",
    resetPassword:"/admin/auth/resetPassword",
  };

  export const ADMIN = {
    updateProfile: "/profile/updateProfile",
  };

  export const USERS = {
    get: "/admin/user/getAllUsers",
    getOne: "/admin/user/getUserById/",
    toggleStatus: "/admin/user/toggleStatus",
  };

  export const SERVICE_PROVIDERS = {
    get: "/users/admin/serviceProvider",
    getOne: "/users/getSpById/",
    toggleStatus: "/users/toggleActiveInActive",
  };

  export const CATEGORIES = {
    get: "/category/GetAllCategoriesNew",
    getOne: "/category/admin/",
    toggleStatus: "/category/toggleActiveInActive",
    edit:"/category/edit/",
  };

  export const FEEDBACK = {
    get: "/contact",
    getOne: "/contact/feedbackById/",
  };


  export const SUBSCRIPTION = {
    get: "/plan/getAllPlans",
    create:"/plan/addPlan",
    getOne: "/plan/getPlanById/",
    edit: "/plan/editPlan/",
    delete: "/plan/deletePlan/",
  };


  export const PAYMENT = {
    get: "/payment",
    getOne: "/payment/",
  };

  export const NOTIFICATION = {
    get: "/notification/getAllAlertsAndNotifications",
    getOne: "/notification/notificationDetail/",
    create: "/notification/createAlertOrAnnoucement",
  };
  
  export const QUERY = {
    get: "/query",
    getOne: "/query/queryById/",
  };

  export const ARTICLE = {
    get: "/article/getAllArticles",
    getOne: "/article/getArticleById/",
    add: "/article/addArticle",
    edit: "/article/updateArticle/",
    delete:"/article/deleteArticle/",
  };


  export const ARTICLECATEGORIES = {
    get: "/articleCategory/getAllArticleCategories",
    getOne: "/articleCategory/getArticleCategoryById/",
    add: "/articleCategory/addArticleCategory",
    edit: "/articleCategory/updateArticleCategory/",
    delete:"/articleCategory/deleteArticelCategory/",
  };


  export const CONTENT_TYPE = {
    JSON: "application/json",
    FORM_DATA: "multipart/form-data",
}