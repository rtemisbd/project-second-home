import "./App.css";
import { Helmet } from "react-helmet";
function App() {
  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta
          name="description"
          content="Find your dream home with Project Second Home - Your trusted partner in real estate. We are working to ensure female safety, accommodation, security, dormitory with 33+ facilities!"
        />
        <meta
          name="keywords"
          content="real estate, hostel, booking, properties, homes, houses, Project Second Home"
        />
        <meta name="author" content="Project Second Home" />
        <link rel="icon" type="image/svg+xml" href="/project-second-home.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto&display=swap"
          rel="stylesheet"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Project Second Home - Your Gateway to Dream Homes</title>
      </Helmet>
    </>
  );
}

export default App;
