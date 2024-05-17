import React from 'react';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsPeopleFill, BsMenuButtonWideFill, BsFileText } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <BsCart3 className='icon_header' /> SHOP
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <Link to="/admin/dashboard/" className="link">
                        <BsGrid1X2Fill className='icon' /> Dashboard
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/admin/dashboard/test-inventory" className="link">
                        <BsFillArchiveFill className='icon' /> Test Inventory
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/admin/dashboard/orders" className="link">
                        <BsCart3 className='icon' /> Orders
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/admin/dashboard/customers" className="link">
                        <BsPeopleFill className='icon' /> Customers
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/admin/dashboard/reports" className="link">
                        <BsMenuButtonWideFill className='icon' /> Reports
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/admin/dashboard/feedback" className="link">
                        <BsFileText className='icon' /> Feedback
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
