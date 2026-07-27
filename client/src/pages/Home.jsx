import MainLayout from "../layouts/MainLayout";
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from "../components/HowItWorks";
import AnalysisPreview from "../components/AnalysisPreview";
import AzureArchitecture from "../components/AzureArchitecture";

function Home(){

return(

<MainLayout>

<Hero />
<Features/>
<HowItWorks/>
<AnalysisPreview/>
<AzureArchitecture/>

</MainLayout>

)

}

export default Home;