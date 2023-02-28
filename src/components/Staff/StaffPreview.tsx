import type { Staff } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export type StaffPreviewProps = {
    staff: Staff;
    link: boolean;
}

const Preview = (staff : Staff): JSX.Element => {
  
    return (
        <>
            <div className="border border-blue-900 flex justify-between p-4 bg-indigo-100 rounded-t-3xl">
                <div className="border border-blue-900 rounded-2xl mr-4 bg-gray-300 p-1">
                    <div className="flex justify-between gap-2">Level: <span>{staff.level}</span></div>
                    <div className="flex justify-between gap-2">Race: <span>{staff.race}</span></div>
                    <div className="flex justify-between gap-2">Job Speciality: <span>{staff.jobSpec}</span></div>
                </div>
                <div className="border border-blue-900 flex"> <Image src="https://via.placeholder.com/100?text=Staff" alt="staff preview thumbnail" height={120} width={100} /> </div>
            </div>
            <div className="bg-blue-400 rounded-b-3xl">
                <table className="text-center mx-auto w-full border border-blue-900 border-separate rounded-b-3xl">
                    <caption className="border border-blue-900 font-bold text-lg">{staff.name}</caption>
                    <thead>
                        <tr>
                            <th className="table-cell"><span>{staff.jobClass}</span></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </>
    )
}

const StaffPreview = ({ staff, link } : StaffPreviewProps): JSX.Element => {
    return (
        <>
        {link ?
            <Link  href={`/staff/${staff.id}`}>
                <Preview {...staff} />
            </Link>
            :
            <Preview {...staff} />
        }
        </>
    )
}

export default StaffPreview;