
import React from 'react';

export default function ApplicationPage(props) {

    return (
        <div>
            <h1>Applications</h1>
            <button className="btn btn-primary">Create App</button>
            <ul className="row applications">
               <li className="col-lg-4 col-md-6">
                   <div className="row">
                       <div className="col-4">
                            <div className="embed-responsive embed-responsive-1by1">
                                <div className="embed-responsive-item">
                                    <div className="application-c-name">A</div>
                                </div>
                            </div>
                       </div>
                       <div className="col-8">
                            <div className="application-name">Naming hfidhfi fh fhdisf sdfhdifhdisfhdsi</div>
                            <div className="application-id">App ID: 7487481748324728 </div>
                       </div>
                   </div>
                </li>
                <li className="col-lg-4 col-md-6">
                   <div className="row">
                       <div className="col-4">
                            <div className="embed-responsive embed-responsive-1by1">
                                <div className="embed-responsive-item">
                                    <div className="application-c-name">A</div>
                                </div>
                            </div>
                       </div>
                       <div className="col-8">
                            <div className="application-name">Naming hfidhfi fh fhdisf sdfhdifhdisfhdsi</div>
                            <div className="application-id">App ID: 7487481748324728</div>
                       </div>
                   </div>
                </li>
                <li className="col-lg-4 col-md-6">
                   <div className="row">
                       <div className="col-4">
                            <div className="embed-responsive embed-responsive-1by1">
                                <div className="embed-responsive-item">
                                    <div className="application-c-name">A</div>
                                </div>
                            </div>
                       </div>
                       <div className="col-8">
                            <div className="application-name">Naming hfidhfi fh fhdisf sdfhdifhdisfhdsi</div>
                            <div className="application-id">App ID: 7487481748324728</div>
                       </div>
                   </div>
                </li>
            </ul>
        </div>
  );
}