import Card from "./Card"
const HomeCards = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card
            children={{
              cardTitle: "Browse our React jobs and start your career today.",
              buttonText: "Browse Jobs",
              buttonLink: "/jobs"
            }}
            bgColor="bg-gray-100" />

          <Card
            children={{
              cardTitle: "List your job to find the perfect developer for the role",
              buttonText: "Add Job",
              buttonLink: "/jobs/add-job"
            }}

            bgColor="bg-indigo-100" />
        </div>
      </div>
    </section>
  )
}

export default HomeCards;