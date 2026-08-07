const Notification = ({message}) => {
    if (!message) {
        return <p></p>
    } else {
        return <p>{message}</p>
    }
}

export default Notification