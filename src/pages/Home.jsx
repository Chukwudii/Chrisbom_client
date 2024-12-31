import Hero from "../components/Hero"
import Card from "../components/categorycard"
import Bestsellers from "../components/bestsellers"
import Feedback from "../components/feedback"
export default function Home() {
    return (
        <>
            <section>
                <Hero />
            </section>

            <section>
                <Card />
            </section>

            <section>
                <Bestsellers />
            </section>

            <section>
                <Feedback />
            </section>
        </>
    )
}