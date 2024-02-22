import React from 'react'
import './index.scss'

const AdminsCount = ({ adminsCount }) => {
  return (
    <div id='admins-count'>
        <div class="body">
            <div class="card education" href="#">
                <div class="overlay"></div>
                <div class="circle">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="29 14 71 76" height="76px" width="71px">
                        
                        <desc>Created with Sketch.</desc>
                        <defs></defs>
                        <g transform="translate(30.000000, 14.000000)" fill-rule="evenodd" fill="none" stroke-width="1" stroke="none" id="Group">
                            <g fill="#D98A19" id="Group-8">
                                <g id="Group-7">
                                    <g id="Group-6">
                                        <path id="Fill-1" d="M0,0 L0,75.9204805 L69.1511499,75.9204805 L0,0 Z M14.0563973,32.2825679 L42.9457663,63.9991501 L14.2315268,63.9991501 L14.0563973,32.2825679 Z"></path>
                                    </g>
                                </g>
                            </g>
                            <g stroke-linecap="square" stroke="#FFFFFF" transform="translate(0.000000, 14.114286)" id="Group-20">
                                <path id="Line" d="M0.419998734,54.9642857 L4.70316223,54.9642857"></path>
                                <path id="Line" d="M0.419998734,50.4404762 L4.70316223,50.4404762"></path>
                                <path id="Line" d="M0.419998734,45.9166667 L4.70316223,45.9166667"></path>
                                <path id="Line" d="M0.419998734,41.3928571 L2.93999114,41.3928571"></path>
                                <path id="Line" d="M0.419998734,36.8690476 L4.70316223,36.8690476"></path>
                                <path id="Line" d="M0.419998734,32.3452381 L4.70316223,32.3452381"></path>
                                <path id="Line" d="M0.419998734,27.8214286 L4.70316223,27.8214286"></path>
                                <path id="Line" d="M0.419998734,23.297619 L2.93999114,23.297619"></path>
                                <path id="Line" d="M0.419998734,18.7738095 L4.70316223,18.7738095"></path>
                                <path id="Line" d="M0.419998734,14.25 L4.70316223,14.25"></path>
                                <path id="Line" d="M0.419998734,9.72619048 L4.70316223,9.72619048"></path>
                                <path id="Line" d="M0.419998734,5.20238095 L2.93999114,5.20238095"></path>
                                <path id="Line" d="M0.419998734,0.678571429 L4.70316223,0.678571429"></path>
                            </g>
                        </g>
                    </svg>
                </div>
                <p style={{textAlign:'center'}}>Admin Count <br /> {adminsCount} </p>
            </div>
        </div>
    </div>
  )
}

export default AdminsCount