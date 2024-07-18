


const Subtext = (props) => {
    return (
        <p className={`text-gray-400 ${props.className}`}>
            {props.children}
        </p>
    )
}

export default Subtext;