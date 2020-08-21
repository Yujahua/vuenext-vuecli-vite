const Plugin = {
    install: (app, options) => {
        console.log(`--Firstly, installing the software web-print driver.--`)
        app.config.globalProperties.webprint = (htmlstr) => {
            window.print(htmlstr);
        }
    }
}
export default Plugin