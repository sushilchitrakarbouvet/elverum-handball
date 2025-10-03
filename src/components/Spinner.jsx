
import { ClipLoader } from "react-spinners";

const override = {
    display: 'block',
    margin: '100px auto'
}

const Spinner = ({ color = "#45854c", loading }) => {

    return (
        <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
        />
    )
}

export default Spinner;