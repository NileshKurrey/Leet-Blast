import React from 'react'
import {
    SquareChevronRight,
    SquareChartGantt,
    CloudLightning,
    Globe,
    BarChart3,
    Settings,
    Briefcase,
    GraduationCap,
    User,
    Star,
    ListMinus
} from 'lucide-react';

function LandingPage() {
    return (
        <div>
            <section className='flex flex-col items-center justify-between min-h-screen pb-10'>
                <nav className='flex items-center justify-between p-5 w-full '>
                    <div>
                        <h1 className='text-primary text-3xl font-bold'>ByteBurst</h1>
                    </div>
                    <div>
                        <ul className='flex items-center justify-between gap-4 text-lg' >
                            <li className='hover:text-gray-300 cursor-pointer'>Home</li>
                            <li className='hover:text-gray-300 cursor-pointer'>About</li>
                            <li className='hover:text-gray-300 cursor-pointer'>Contact us</li>
                        </ul>
                    </div>
                    <div className='flex item-center justify-between gap-4'>
                        <button className='bg-none border-1 pr-2 pl-2 pt-1 pb-1 border-primary rounded-lg font-bold cursor-pointer transition duration-300 ease-in-out hover:bg-primary/20 hover:border-primary/20'>
                            Sign Up
                        </button>
                        <button className='pr-2 pl-2 pt-1 pb-1 bg-primary rounded-lg font-bold cursor-pointer transition duration-300 ease-in-out hover:bg-secondary'>Sign In</button>
                    </div>
                </nav>
                <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-primary opacity-30 blur-3xl rounded-md bottom-9"></div>
                <div className="absolute top-16 right-0 w-1/3 h-1/3 bg-primary opacity-30 blur-3xl rounded-md bottom-9"></div>
                <div className='flex flex-col justify-center items-center mt-40'>
                    <h1 className='text-neutral-content text-5xl font-bold '>Execute Code at Burst Speed</h1>
                    <h2 className='mt-4 text-gray-300 text-lg'>Compile, test, and deploy snippets in milliseconds with zero setup</h2>
                    <button className='mt-4 btn rounded-lg pt-0 pb-0 p-10 text-neutral-content btn-primary btn-lg transition delay-150 duration-300 ease-in-out shadow-xl hover:shadow-primary/50 hover:-translate-y-1 hover:scale-110'>Start Coding →</button>
                </div>

                <div className='bg-gray-600 border-1 border-gray-400 rounded-lg h-150 ml-10 w-320 mt-20'></div>
            </section>
         <section className="flex flex-col items-center justify-center mt-32 w-full px-4">
  <div className="max-w-6xl w-full">
    <h1 className="text-center text-5xl font-bold mb-6 text-neutral-content">Features</h1>
    <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
      Powerful tools designed to help you code faster and smarter
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Feature Card 1 */}
      <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 backdrop-blur-sm border border-primary/20 p-6 rounded-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 hover:border-primary/40">
        <div className="flex items-center mb-4 text-primary">
          <SquareChevronRight size={24} className="mr-3" />
          <h2 className="text-xl font-semibold">Simple Interface</h2>
        </div>
        <p className="text-gray-300">
          Start coding in seconds with our intuitive, easy-to-use interface
        </p>
      </div>

      {/* Feature Card 2 */}
      <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 backdrop-blur-sm border border-primary/20 p-6 rounded-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 hover:border-primary/40">
        <div className="flex items-center mb-4 text-primary">
          <SquareChartGantt size={24} className="mr-3" />
          <h2 className="text-xl font-semibold">Multiple Languages</h2>
        </div>
        <p className="text-gray-300">
          Support for 40+ popular languages including JavaScript, Python, Java, and more
        </p>
      </div>

      {/* Feature Card 3 */}
      <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 backdrop-blur-sm border border-primary/20 p-6 rounded-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 hover:border-primary/40">
        <div className="flex items-center mb-4 text-primary">
          <CloudLightning size={24} className="mr-3" />
          <h2 className="text-xl font-semibold">Fast Execution</h2>
        </div>
        <p className="text-gray-300">
          Get instant feedback with our high-performance execution environment
        </p>
      </div>
    </div>
  </div>
</section>

            {/* Bento Grid Section */}
            <section className="flex flex-col items-center justify-center mt-32 w-full px-4">
                <h1 className="text-center text-5xl font-bold mb-16">Powerful Development Ecosystem</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
                    {/* Curated Playlists */}
                    <div className="card bg-gradient-to-br from-violet-900/30 to-purple-900/30 border border-primary/20 p-6 rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all duration-500">
                        <div className="flex items-center mb-4">
                            <ListMinus className="text-emerald-400 mr-3" size={28} />
                            <h3 className="text-xl font-bold">Curated Playlists</h3>
                        </div>
                        <p className="text-gray-300">Structured coding challenges for front-end, back-end, and full-stack roles</p>
                    </div>

                    {/* Multilanguage Support */}
                    <div className="card bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-primary/20 p-6 rounded-xl hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500">
                        <div className="flex items-center mb-4">
                            <Globe className="text-amber-400 mr-3" size={28} />
                            <h3 className="text-xl font-bold">Multilanguage Support</h3>
                        </div>
                        <p className="text-gray-300">Practice in multiple languages including Python, JavaScript, Java, C++, and more</p>
                    </div>

                    {/* User Statistics */}
                    <div className="card bg-gradient-to-br from-pink-900/30 to-rose-900/30 border border-primary/20 p-6 rounded-xl row-span-2 hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-500">
                        <div className="flex flex-col h-full justify-between">
                            <div>
                                <div className="flex items-center mb-4">
                                    <BarChart3 className="text-pink-400 mr-3" size={28} />
                                    <h3 className="text-xl font-bold">Performance Analytics</h3>
                                </div>
                                <p className="text-gray-300 mb-6">Track progress with detailed metrics</p>

                                <div className="space-y-3 mt-4">
                                    <div className="flex justify-between text-sm">
                                        <span>Completion Rate</span>
                                        <span className="font-bold text-emerald-400">83%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '83%' }}></div>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span>Accuracy</span>
                                        <span className="font-bold text-amber-400">91%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customize Questions */}
                    <div className="card bg-gradient-to-br from-indigo-900/30 to-blue-900/30 border border-primary/20 p-6 rounded-xl col-span-2 hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-500">
                        <div className="flex items-center mb-4">
                            <Settings className="text-indigo-400 mr-3" size={28} />
                            <h3 className="text-xl font-bold">Custom Question Sets</h3>
                        </div>
                        <p className="text-gray-300">Create personalized practice sessions based on company, topic, or difficulty level</p>

                        <div className="flex flex-wrap gap-2 mt-4">
                            <span className="px-2 py-1 bg-indigo-800/50 text-xs rounded">Google</span>
                            <span className="px-2 py-1 bg-indigo-800/50 text-xs rounded">System Design</span>
                            <span className="px-2 py-1 bg-indigo-800/50 text-xs rounded">Behavioral</span>
                        </div>
                    </div>

                    {/* Interview Preparation */}
                    <div className="card bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-primary/20 p-6 rounded-xl hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-500">
                        <div className="flex items-center mb-4">
                            <Briefcase className="text-teal-400 mr-3" size={28} />
                            <h3 className="text-xl font-bold">Interviews preprations</h3>
                        </div>
                        <p className="text-gray-300">Companies asked questions</p>
                    </div>

                    <div className="card bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-primary/20 p-6 rounded-xl hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-500">
                        <div className="flex items-center mb-4">
                            <GraduationCap className="text-amber-400 mr-3" size={28} />
                            <h3 className="text-xl font-bold">Company Guides</h3>
                        </div>
                        <p className="text-gray-300">Insider tips for FAANG, startups, and more</p>
                    </div>

                    {/* Premium Features */}
                    <div className="card bg-gradient-to-br from-fuchsia-900/30 to-violet-900/30 border border-primary/20 p-6 rounded-xl hover:shadow-xl hover:shadow-fuchsia-500/20 transition-all duration-500">
                        <div className="flex items-center mb-4">
                            <Star className="text-fuchsia-400 mr-3" size={28} />
                            <h3 className="text-xl font-bold">Premium Content</h3>
                        </div>
                        <p className="text-gray-300">Unlock exclusive playlists and advanced analytics</p>
                    </div>
                </div>
            </section>

            <footer className=' mt-32 p-10 flex items-center justify-center'>
                <div className='flex flex-col items-center justify-center mx-auto w-350 bg-gray-900 text-gray-300 p-10 rounded-lg shadow-lg border border-gray-800/20'>
                    <div className=''>
                        <h1 className='text-3xl font-bold text-primary'>ByteBurst</h1>
                        <p className='mt-2'>© 2023 ByteBurst. All rights reserved.</p>

                    </div>
                    <div className="divider"></div>
                    <div>
                        <ul className='flex items-center justify-between gap-4 text-lg'>
                            <p className="text-gray-400 text-sm flex items-center justify-center gap-1">
                                Made with
                                <span className="text-primary animate-pulse">❤️</span>
                                by
                                <span className="font-medium text-white">Nilesh Kurrey</span>
                            </p>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage