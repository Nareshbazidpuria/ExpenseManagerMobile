import CollapsibleHeader from "./CollapsibleHeader";
import Collapsible from "react-native-collapsible";

const Collapse = ({ col, setCol, Key, child, title, to, setRefresh }) => (
  <>
    <CollapsibleHeader
      col={col}
      Key={Key}
      setCol={setCol}
      title={title}
      to={to}
      setRefresh={setRefresh}
    />
    <Collapsible collapsed={col?.[Key]}>{child}</Collapsible>
  </>
);

export default Collapse;
