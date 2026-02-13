import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Float, Environment } from '@react-three/drei';

type FeatureKey = 'whatsapp' | 'coldOutreach' | 'unified' | 'extraction';

const featureDetails: Record<FeatureKey, { title: string; description: string }> = {
  whatsapp: {
    title: 'WhatsApp bot integration',
    description:
      'Automate replies, qualify leads, and keep conversations flowing in WhatsApp with always-on AI assistants.',
  },
  coldOutreach: {
    title: 'Cold email & WhatsApp outreach',
    description:
      'Launch smart multi-channel sequences that mix WhatsApp messages and email for higher reply rates.',
  },
  unified: {
    title: 'Unified communication access',
    description:
      'See WhatsApp threads and email conversations in one AI-augmented workspace for faster decisions.',
  },
  extraction: {
    title: 'AI data extraction',
    description:
      'Turn unstructured chats and emails into structured CRM-ready insights with AI-driven parsing.',
  },
};

interface NodeProps {
  position: [number, number, number];
  color: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const InteractiveNode: React.FC<NodeProps> = ({ position, color, label, active, onClick }) => {
  return (
    <Float speed={active ? 2 : 1} floatIntensity={active ? 2 : 1}>
      <mesh position={position} onClick={onClick} castShadow receiveShadow>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={active ? color : '#000000'}
          emissiveIntensity={active ? 0.7 : 0.2}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
      <Html distanceFactor={10} position={[position[0], position[1] + 1.2, position[2]]}>
        <div className={`node-label ${active ? 'node-label-active' : ''}`}>{label}</div>
      </Html>
    </Float>
  );
};

const DataStream: React.FC<{ active?: boolean }> = ({ active }) => {
  const segments = Array.from({ length: 20 });
  return (
    <group>
      {segments.map((_, i) => (
        <mesh
          key={i}
          position={[0, -1.5 + i * 0.15, 0]}
          rotation={[0, 0, Math.PI / 4]}
          scale={[1, 0.8, 1]}
        >
          <boxGeometry args={[0.02, 0.12, 0.02]} />
          <meshStandardMaterial
            color={active ? '#4ade80' : '#a5b4fc'}
            emissive={active ? '#22c55e' : '#6366f1'}
            emissiveIntensity={active ? 1.4 : 0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

const Homepage: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<FeatureKey>('whatsapp');

  return (
    <div className="page-root">
      <header className="nav">
        <div className="nav-left">
          <div className="logo-orb" />
          <span className="logo-text">OrbitComms</span>
        </div>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#contact">Talk to us</a>
        </nav>
        <div className="nav-cta">
          <button className="btn ghost">View demo</button>
          <button className="btn primary">Get early access</button>
        </div>
      </header>

      <main className="main-layout">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">AI outreach cockpit · Live 3D</p>
            <h1>
              One 3D canvas
              <br />
              for WhatsApp, email & data.
            </h1>
            <p className="subtitle">
              Visually orchestrate WhatsApp bots, cold outreach and AI extraction from a single,
              living 3D dashboard.
            </p>
            <div className="hero-actions">
              <button className="btn primary">Launch workspace</button>
              <button className="btn ghost">Watch 90s overview</button>
            </div>
            <div className="hero-footnote">
              No code required · Works on top of your existing WhatsApp & email stack.
            </div>
          </div>

          <div className="hero-3d">
            <Canvas
              camera={{ position: [0, 0.5, 6], fov: 45 }}
              shadows
              gl={{ antialias: true, alpha: true }}
            >
              <color attach="background" args={['#020617']} />
              <ambientLight intensity={0.6} />
              <directionalLight
                position={[4, 6, 3]}
                intensity={1.2}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <Environment preset="city" />

              <Float speed={1} floatIntensity={0.8}>
                <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -2, 0]}>
                  <circleGeometry args={[4.2, 64]} />
                  <meshStandardMaterial
                    color="#020617"
                    metalness={0.4}
                    roughness={0.9}
                    emissive="#1d2440"
                    emissiveIntensity={0.8}
                  />
                </mesh>
              </Float>

              <group>
                <InteractiveNode
                  position={[-2, 0.4, 0]}
                  color="#22c55e"
                  label="WhatsApp bots"
                  active={activeFeature === 'whatsapp'}
                  onClick={() => setActiveFeature('whatsapp')}
                />
                <InteractiveNode
                  position={[2, 0.4, 0]}
                  color="#38bdf8"
                  label="Cold outreach"
                  active={activeFeature === 'coldOutreach'}
                  onClick={() => setActiveFeature('coldOutreach')}
                />
                <InteractiveNode
                  position={[0, 1.6, -0.6]}
                  color="#a855f7"
                  label="Unified inbox"
                  active={activeFeature === 'unified'}
                  onClick={() => setActiveFeature('unified')}
                />
                <InteractiveNode
                  position={[0, -0.6, 0.6]}
                  color="#f97316"
                  label="AI extraction"
                  active={activeFeature === 'extraction'}
                  onClick={() => setActiveFeature('extraction')}
                />

                <DataStream active={activeFeature === 'extraction'} />
              </group>

              <OrbitControls
                enablePan={false}
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.7}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={(2 * Math.PI) / 3}
              />
            </Canvas>

            <div className="feature-pills" id="features">
              {(Object.keys(featureDetails) as FeatureKey[]).map((key) => (
                <button
                  key={key}
                  className={`feature-pill ${activeFeature === key ? 'feature-pill-active' : ''}`}
                  onClick={() => setActiveFeature(key)}
                >
                  {featureDetails[key].title}
                </button>
              ))}
            </div>

            <div className="feature-card">
              <h2>{featureDetails[activeFeature].title}</h2>
              <p>{featureDetails[activeFeature].description}</p>
              <div className="feature-tags">
                {activeFeature === 'whatsapp' && (
                  <>
                    <span>24/7 automation</span>
                    <span>Lead qualification</span>
                    <span>Reply suggestions</span>
                  </>
                )}
                {activeFeature === 'coldOutreach' && (
                  <>
                    <span>Sequences</span>
                    <span>A/B testing</span>
                    <span>Smart throttling</span>
                  </>
                )}
                {activeFeature === 'unified' && (
                  <>
                    <span>Single pane</span>
                    <span>AI summaries</span>
                    <span>Routing rules</span>
                  </>
                )}
                {activeFeature === 'extraction' && (
                  <>
                    <span>Entity extraction</span>
                    <span>CRM sync</span>
                    <span>Custom schemas</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="secondary" id="how-it-works">
          <div className="secondary-card">
            <h3>How the 3D scene matches the product</h3>
            <ul>
              <li>
                <strong>WhatsApp automation node</strong> — the green orb represents live bot
                activity, pulsing as new conversations are handled.
              </li>
              <li>
                <strong>Cold outreach node</strong> — the blue orb visualises outbound sequences
                running across WhatsApp and email.
              </li>
              <li>
                <strong>Unified inbox node</strong> — the purple orb hovers at the top, showing
                everything rolling up into one cockpit.
              </li>
              <li>
                <strong>AI extraction node & stream</strong> — the orange orb and vertical light
                stream represent raw messages turning into structured data.
              </li>
            </ul>
          </div>

          <div className="secondary-card" id="contact">
            <h3>Plug into your existing tools</h3>
            <p>
              Connect WhatsApp Business, Gmail, Outlook or your CRM. Our AI layer sits on top,
              orchestrates automations and keeps humans in the loop when it matters.
            </p>
            <form className="inline-form">
              <input type="email" placeholder="Work email" />
              <button className="btn primary" type="submit">
                Request a walkthrough
              </button>
            </form>
            <p className="tiny-copy">We respond within one business day.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} OrbitComms · Built for AI-first teams.</span>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Security</a>
          <a href="#">Status</a>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

