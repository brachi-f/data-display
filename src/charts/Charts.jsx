import { useSelector } from "react-redux"
import ClicksChart from "./ClickChart"
import TargetsChart from "./TargetsChart"
import ClicksByDayChart from "./ClicksByDayChart"

const Charts = () => {
    const links = useSelector(s => s.links)
    // < TargetsChart linkId={links[0].id} />
    return        <ClicksByDayChart />
}
export default Charts