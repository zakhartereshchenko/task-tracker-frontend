
interface IProps {
    children: React.ReactNode
    className?: string
}
export const Container: React.FC<IProps> = ({ children, className }) => {
    return (
        <div className={`max-w-7xl mx-auto px-7 ${className}`}>
            {children}
        </div>
    )
}

export const PageContainer: React.FC<IProps> = ({ children, className }) => {
    return (
        <Container className={`py-5 flex flex-col gap-4 ${className}`}>
            {children}
        </Container>
    )
}
