const regex = {
    EMAIL_REGEX: /^[a-z0-9._%+-]+@gmail\.com$/,
    MOBILE_REGEX: /^\d{10}$/,
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
}
export default regex