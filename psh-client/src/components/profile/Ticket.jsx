import { Tabs, TabsHeader, TabsBody, TabPanel } from "@material-tailwind/react";
import "./booking.css";

import TicketCreate from "./TicketCreate";

export default function Ticket() {
  return (
    <Tabs value="create">
      <TabsHeader
        className="bg-transparent"
        indicatorProps={{
          className: "bg-blue-500/10 shadow-none text-blue-500",
        }}
      ></TabsHeader>
      <TabsBody>
        <TabPanel value="create" className="py-0 mt-10">
          <TicketCreate />
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}
