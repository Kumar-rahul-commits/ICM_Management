const SLA_HOURS = {
    high: 4,
    medium:24,
    low:72
}

function calculateDeadline(priority,from = new Date()) {
    const hours = SLA_HOURS[priority] || SLA_HOURS.medium
    return new Date(from.getTime() + hours *60 *60*1000)}

    module.exports = {SLA_HOURS, calculateDeadline}