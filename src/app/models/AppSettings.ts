export class AppSettings {
    public static ServiceBaseUrl = 'http://localhost:3758/Api';
    public static UsersBaseUrl = AppSettings.ServiceBaseUrl + '/UserDetail';
    public static ProjectsUrl = AppSettings.ServiceBaseUrl + '/ProjectDetail';
    public static TasksUrl = AppSettings.ServiceBaseUrl + '/TaskDetail';
    public static LoggingUrl = AppSettings.ServiceBaseUrl + '/ErrorLog';

    public static IsoDateFormat = 'yyyy-MM-dd';
    public static StartDateFieldName = 'startDate';
    public static EndDateFieldName = 'endDate';
    public static AlertDanger = 'danger';
    public static AlertDangerClass = 'alert alert-danger alert-dismissible';
    public static AlertSuccess = 'successs';
    public static AlertSuccessClass = 'alert alert-success alert-dismissible';
    public static GenericError = 'There was a problem in processing your request. Please try again later.';

    constructor() {

    }

}
