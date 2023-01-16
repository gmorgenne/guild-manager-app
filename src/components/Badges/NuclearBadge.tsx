import type { IBadge } from "./types";

const NuclearBadge = ({ PrimaryColor, SecondaryColor }: IBadge): JSX.Element => {
    const badgeStyle = { 
        backgroundColor: SecondaryColor, 
        fill: PrimaryColor, 
        stroke: 'black'  
    };

    return (
        <svg width="100%" height="100%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" style={badgeStyle}>
            <g id="nuclear" transform="matrix(2.84432,0,0,2.84432,9.77251,2.45688)">
                <path d="M11,17C11,15 12,14 14,14C16,14 17,15 17,17C17,19 16,20 14,20C12,20 11,19 11,17ZM11,17C11,15 12,14 14,14C16,14 17,15 17,17C17,19 16,20 14,20C12,20 11,19 11,17ZM28,17C28,18.688 27.687,20.313 27.062,21.875C26.437,23.437 25.624,24.813 24.562,26C23.5,27.187 22.312,28.188 20.874,29L15.936,20.5C17.311,19.75 17.999,18.562 17.999,17L28,17ZM14,13C13.25,13 12.562,13.188 11.937,13.563L6.937,4.938C9.125,3.688 11.5,3 14,3C16.5,3 18.875,3.625 21.063,4.875L16,13.563C15.375,13.188 14.687,13 14,13ZM10,17C10,18.563 10.688,19.75 12.063,20.5L7.125,29C4.937,27.75 3.25,26.125 1.937,24C0.624,21.875 -0.001,19.562 -0.001,17L10,17Z" />
            </g>
        </svg>
    )
}

export default NuclearBadge;