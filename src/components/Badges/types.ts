export interface IBadge {
    Index?: number | null;
    PrimaryColor: string;
    SecondaryColor: string;
}

export interface BadgeSelectorProps {
    PrimaryColor: string;
    SecondaryColor: string;
    SelectedIndex: number;
    selectBadge: (index: number) => void;
}