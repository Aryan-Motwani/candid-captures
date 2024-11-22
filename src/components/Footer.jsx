export default function Footer() {
  
  const currentYear = new Date().getFullYear();

  return (
    <footer>
            <div className="wrapper py-[50px] md:py-[100px] text-sm flex flex-col space-y-8 text-center justify-between items-center md:flex-row-reverse md:space-y-0">
                <div className="flex space-x-6">
                    <a href="https://www.instagram.com/candidcapturesbysomeshnihalani/" target="_blank" aria-label="Visit Instagram page">
                        Instagram
                    </a>
                    <a href="https://www.instagram.com/candidcapturesbysomeshnihalani/" target="_blank" aria-label="Visit Facebook page">
                        Facebook
                    </a>
                    {/* <a href="https://www.istockphoto.com/portfolio/NemanjaMohenski" target="_blank" aria-label="Visit iStock portfolio">
                        iStock
                    </a> */}
                </div>
                <p>&copy; {currentYear} Candid Captures. Developed by <a href="https://www.instagram.com/flikcards/" target="_blank" className="underline">Aryan Motwani</a></p>
            </div>
        </footer>
  )
}