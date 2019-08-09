const path = require("path")

module.exports = () => ({
    module : {
        rules : [
            {
                test : /\.css$/,
                use : ["style-loader", "css-loader"]
            }
        ]
    },

    devServer : {
        contentBase : path.join(__dirname, "..", "dist"),
        compress : true
    }
})