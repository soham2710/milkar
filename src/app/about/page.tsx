import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-orange-600">MILKAR</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Our mission is to transform how people buy real estate in Indore
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-4">
              MILKAR (meaning "together" in Hindi) was founded on a simple observation: when people come together, they can achieve more than they could individually.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Our founder noticed that while individuals could only negotiate small discounts with real estate developers, groups could secure much better deals. This insight led to the creation of MILKAR - a platform that brings together buyers to leverage collective purchasing power.
            </p>
            <p className="text-lg text-gray-600">
              Since our inception, we've helped hundreds of families in Indore secure their dream properties at significantly better prices than they could have negotiated individually.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            
            <div className="space-y-12">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-600 text-white font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Group Formation</h3>
                  <p className="text-gray-600">
                    We form groups of 50+ buyers who are interested in properties in the same area or from the same developer in Indore.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-600 text-white font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Negotiation</h3>
                  <p className="text-gray-600">
                    We approach builders with our group of ready buyers, offering them the opportunity to sell multiple properties at once, which allows for better discount negotiation.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-600 text-white font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Property Selection</h3>
                  <p className="text-gray-600">
                    Based on the negotiated terms, group members can select their preferred properties from the available options.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-600 text-white font-bold">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Purchase Support</h3>
                  <p className="text-gray-600">
                    We provide guidance throughout the purchase process, ensuring a smooth experience for all buyers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-orange-600">Transparency</h3>
                <p className="text-gray-600">
                  We believe in complete transparency in all our dealings with buyers and builders.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-orange-600">Integrity</h3>
                <p className="text-gray-600">
                  We always act with integrity and honesty, ensuring fair deals for all parties involved.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-orange-600">Community</h3>
                <p className="text-gray-600">
                  We foster a sense of community among our buyers, encouraging collaboration for mutual benefit.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-orange-600">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in all our services and aim to exceed expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-orange-50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Join the MILKAR Family</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Ready to leverage the power of collective buying? Get in touch with us today!
          </p>
          <Link href="/contact" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg text-lg">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}