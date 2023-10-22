import {Field,} from "formik";
import {Tag} from "../UI/Button/Button.jsx";

export default function FirstGraphTags({values, options, name}) {
    return (
        <>
            {
                options.map(option => {
                    return <label key={option}>
                        <Field type="checkbox" name={name} value={option} className="hidden"/>
                        <Tag active = {(values.indexOf(option) !== -1) } >{option}</Tag>
                    </label>
                })
            }
        </>
    )
}