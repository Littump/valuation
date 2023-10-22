import Button from "@mui/material/Button";
import {Link} from 'react-scroll';

export default function AnchorButton({href = '', text = ''}) {
    return <>
        <Link to={href}
              smooth={true}
              offset={-200}
              duration={500}>
            <Button variant='contained'>
                {text}
            </Button>
        </Link>
    </>
}