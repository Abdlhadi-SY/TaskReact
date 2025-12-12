import "./Err404.css";
export default function Err404() {
  return (
    <section className="page_404">
      <div className="container">
        <div className="log">
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1  text-center" style={{margin:"auto"}}>
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>
                <p>the page you are looking for not avaible!</p>
                <a href="/dashboard" className="link_404" style={{borderRadius:"6px"}}>
                  Go to Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
