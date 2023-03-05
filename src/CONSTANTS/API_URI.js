// export const getIP =()=> {
//     localStorage.setItem("IP", JSON.stringify("192.168.118.41"))
//     console.log(localStorage.getItem("IP"))
//     var IP = localStorage.getItem("IP")
//     return IP
// }

export const API_ROOT = `API`;

// var IP = `192.168.137.177`;
// var IP = `192.168.118.41`;
// var IP = `192.168.0.131`
var IP = `192.168.0.102`;
// var IP = `192.168.0.103`;

// var IP = localStorage.getItem("IP");
export const localStorage_USER_KEY = "user";
export const localStorage_EXPIRE_TIME = 3600000; //1 hour.

export const BASE_URL = `http://${IP}/sebl.branchmanager/${API_ROOT}`;
export const CREATE = `create`;
export const READ = `read`;
export const UPDATE = `update`;
export const DELETE = `delete`;
export const SEARCH = `search`;
export const AUTH_CHECK = `check`;

export const API_AUTH_CHECK = `${BASE_URL}/${AUTH_CHECK}/authCheck.php`;

//    Branch
export const API_GET_ALL_BRANCH_DATA = `${BASE_URL}/${READ}/getAllBranchData.php`;
export const API_GET_SINGLE_BRANCH_DATA = `${BASE_URL}/${READ}/getSingleBranch.php`;
export const API_ADD_BRANCH = `${BASE_URL}/${CREATE}/addBranchData.php`;
export const API_DELETE_BRANCH = `${BASE_URL}/${DELETE}/deleteBranch.php`;
export const API_SEARCH_BRANCH_BY_PHONE_NUMBER = `${BASE_URL}/$SEARCH/searchSingleBranchByAlarmNumber.php`;
export const API_UPDATE_BRANCH = `${BASE_URL}/${UPDATE}/updateBranch.php`;
export const API_UPDATE_BRANCH_STATUS = `${BASE_URL}/${UPDATE}/updateBranchStatus.php`;

//    keyword
export const API_GET_ALL_KEYWORD_DATA = `${BASE_URL}/${READ}/getAllKeyWordForCall.php`;
export const API_GET_SINGLE_KEYWORD_DATA = `${BASE_URL}/${READ}/getSingleKeyWordForCall.php`;
export const API_ADD_KEYWORD = `${BASE_URL}/${CREATE}/addKeyWordForCallData.php`;
export const API_SEARCH_KEY_BY_KEY = `${BASE_URL}/$SEARCH/searchSingleKeyByName.php`;
export const API_DELETE_KEYWORD = `${BASE_URL}/${DELETE}/deleteKeyWordForCall.php`;
export const API_UPDATE_KEYWORD = `${BASE_URL}/${UPDATE}/updateKeyWordForCall.php`;
//    User
export const API_GET_ALL_USER_DATA = `${BASE_URL}/${READ}/getAllAccount.php`;
export const API_GET_SINGLE_USER_DATA = `${BASE_URL}/${READ}/getSingleAccount.php`;
export const API_ADD_USER = `${BASE_URL}/${CREATE}/addAccountData.php`;
export const API_DELETE_USER = `${BASE_URL}/${DELETE}/deleteAccount.php`;
export const API_UPDATE_USER = `${BASE_URL}/${UPDATE}/updateAccount.php`;

//    numberToCall
export const API_GET_ALL_NUMBER_TO_CALL_DATA = `${BASE_URL}/${READ}/getAllNumberToCall.php`;
export const API_GET_SINGLE_NUMBER_TO_CALL_DATA = `${BASE_URL}/${READ}/getSingleNumberToCall.php`;
export const API_ADD_NUMBER_TO_CALL = `${BASE_URL}/${CREATE}/addNumberToCallData.php`;
export const API_DELETE_NUMBER_TO_CALL = `${BASE_URL}/${DELETE}/deleteNumberToCall.php`;

//    sms
export const API_GET_ALL_SMS_DATA = `${BASE_URL}/${READ}/getAllSmsData.php`;
export const API_ADD_SMS = `${BASE_URL}/${CREATE}/addSmsData.php`;
// ------------------ API string declaration end ----------------------
