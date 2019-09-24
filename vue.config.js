module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://pretest-qa.privydev.id',
                ws: true,
                changeOrigin: true
            }
        }
    }
}