import React from 'react';

const MainFooter = () => {
    return (
        <>
            <footer className="bg-purple-900 text-white py-10">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="text-lg font-semibold mb-2">🦜 Details</div>
                        <p className="text-sm">© 2025. SOLTech inc. all rights reserved.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Company</h4>
                        <ul className="space-y-1 text-sm">
                            <li>About us</li>
                            <li>Privacy</li>
                            <li>Company Info</li>
                            <li>Hiring</li>
                            <li>Partnership</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Support</h4>
                        <ul className="space-y-1 text-sm">
                            <li>Help center</li>
                            <li>Terms of service</li>
                            <li>Privacy policy</li>
                            <li>Status</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Stay up to date</h4>
                        <input
                            type="email"
                            placeholder="dydwoj@gmail.com"
                            className="px-3 py-2 rounded text-black w-full"
                            readOnly={true}
                        />
                    </div>
                </div>
            </footer>
        </>
    );
};

export default MainFooter;