
export default function SectionTitle({ title }: { title: string }) {
    return (
        <h1 className="my-2 font-semibold
            text-xl
            md:text-2xl
        ">{title}</h1>
    )
}