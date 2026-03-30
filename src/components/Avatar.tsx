interface IProps {
    name: string
}

export const Avatar: React.FC<IProps> = ({ name }) => {
    const splittedName = name.split(" ");
    const initials = splittedName.length > 1
        ? splittedName[0][0].toUpperCase() + splittedName[1][0].toUpperCase()
        : splittedName[0][0].toUpperCase();
        
    return (
        <div className="bg-gray-300 text-gray-700 font-bold rounded-full min-w-10 min-h-10 flex items-center justify-center">
            {initials}
        </div>
    )
}