module.exports ={
    css: {
        requireModuleExtension: true,
        sourceMap: true,
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: {
                        "vab-color-blue": "#1890ff",
                        "vab-margin": "20px",
                        "vab-padding": "20px",
                        "vab-header-height": "65px"
                    }
                }
            }
        }
    }
}
