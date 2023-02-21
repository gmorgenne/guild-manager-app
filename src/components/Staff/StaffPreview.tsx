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
            <div className="flex justify-between p-4 bg-white">
                <div className="mr-4 bg-yellow-100">
                    <div>Level: {staff.level}</div>
                    <div>Race: {staff.race}</div>
                    <div>Job Class: {staff.jobClass}</div>
                    <div>Job Speciality: {staff.jobSpec}</div>
                </div>
                <Image src="https://via.placeholder.com/100?text=Staff" alt="staff preview thumbnail" height={120} width={100} />
            </div>
            <div className="bg-gray-300">
                <table className="text-center mx-auto w-full border border-red-900 border-separate">
                    <caption className="text-lg my-2">{staff.name}</caption>
                    <thead>
                        <tr>
                            <th className="table-cell">Job Speciality</th>
                        </tr>
                    </thead>
                    {/* Add a way to bring in a Job Class Speciality
                    <tbody>
                        <tr>
                            <td className={tableCellClass(staff.speciality)}>{staff.speciality}</td>
                        </tr>
                    </tbody> */}
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