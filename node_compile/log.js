const log = {
    green: (message) => {
        console.log('\x1b[32m%s\x1b[0m', message)
    },
    yellow: (message) => {
        console.log('\x1b[33m%s\x1b[0m', message)
    },
    blue: (message) => {
        console.log('\x1b[34m%s\x1b[0m', message)
    },
    purple: (message) => {
        console.log('\x1b[35m%s\x1b[0m', message)
    }
}

module.exports = log;