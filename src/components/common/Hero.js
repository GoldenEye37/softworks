

export default function HeroSection(){
    return (
        <section className="dark:bg-gray-600 dark:text-gray-100 min-w-full h-1/5 mt-4 rounded-lg">
            <div
                className="container rounded-lg mx-auto flex flex-col items-center px-4 py-4 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
                <h1 className="text-4xl font-bold leading-none sm:text-5xl">Quisquam necessita vel
                    <span className="dark:text-amber-200">laborum doloribus</span>delectus
                </h1>
                <p className="px-8 mt-8 mb-12 text-sm">Cupiditate minima voluptate temporibus quia? Architecto beatae
                    esse ab amet vero eaque explicabo!</p>
                <div className="flex flex-wrap justify-center">
                    <button
                        className="px-8 py-3 m-2 text-lg font-semibold rounded bg-amber-600 dark:text-white"
                    >
                        View Products
                    </button>
                </div>
            </div>
        </section>
    )
}