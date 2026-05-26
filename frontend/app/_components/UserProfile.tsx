import React, { ReactNode } from 'react'

const GoogleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

type InfoRowProps = {
  icon: ReactNode
  label: string
  value: ReactNode
  actionIcon?: ReactNode
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value, actionIcon }) => (
  <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 last:border-b-0">
    <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 text-gray-400">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[11px] text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-gray-800 truncate">{value}</p>
    </div>
    <div className="text-emerald-600 shrink-0">{actionIcon}</div>
  </div>
)

export default function UserProfile({ onSignOut, onChangePassword }: { onSignOut: () => void; onChangePassword: () => void }) {
  const user = {
    name: "Alex Rivers",
    email: "alex.rivers@urbanmobility.com",
    phone: "+1 (555) 012-3456",
    location: "San Francisco, CA",
    joinDate: "Oct 24, 2023",
    isPremium: true,
    isVerified: true,
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 font-sans">

      {/* Avatar + Name */}
      <div className="flex flex-col items-center gap-2.5 pb-6">
        <div className="relative">
          <div className="w-22 h-22 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-200 text-2xl font-medium select-none"
            style={{ width: 88, height: 88 }}>
            AR
          </div>
          <div className="absolute bottom-0.5 right-0.5 w-5 h-5 bg-emerald-700 rounded-full border-2 border-white flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#d1fae5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900">{user.name}</h1>
          <p className="text-sm text-gray-400 mt-0.5">{user.email}</p>
        </div>
        <div className="flex gap-2 flex-wrap justify-center mt-1">
          {user.isPremium && (
            <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
              ★ Premium Rider
            </span>
          )}
          {user.isVerified && (
            <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
              Verified Account
            </span>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <h2 className="text-[15px] font-medium text-gray-800 mb-3">Personal information</h2>
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-5">
        <InfoRow
          label="Full name"
          value={user.name}
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          }
          actionIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          }
        />
        <InfoRow
          label="Email"
          value={user.email}
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
          }
          actionIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          }
        />
        <InfoRow
          label="Phone number"
          value={user.phone}
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          }
          actionIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          }
        />
        <InfoRow
          label="Base location"
          value={user.location}
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          }
          actionIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
          }
        />
      </div>

      {/* Account Status + Security */}
      <div className="grid grid-cols-2 gap-3 mb-5 sm:grid-cols-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
        {/* Account Status */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <h3 className="text-[15px] font-medium text-gray-800 mb-3">Account status</h3>
          <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
            <span className="text-sm text-gray-400">Status</span>
            <span className="text-sm font-medium text-emerald-600 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
              Active
            </span>
          </div>
          <div className="flex justify-between items-center py-1.5">
            <span className="text-sm text-gray-400">Join date</span>
            <span className="text-sm font-medium text-gray-700">{user.joinDate}</span>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <h3 className="text-[15px] font-medium text-gray-800 mb-3">Security</h3>
          <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
            <span className="text-sm text-gray-400">Auth provider</span>
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
              <GoogleIcon />
              <span className="text-xs font-medium text-gray-700">Google</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-1.5">
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Password
            </span>
            <button
              onClick={onChangePassword}
              className="text-xs font-semibold text-emerald-600 tracking-wide hover:text-emerald-700 cursor-pointer bg-transparent border-none"
            >
              CHANGE
            </button>
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <button
        onClick={onSignOut}
        className="w-full py-3.5 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-red-100 transition-colors cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Sign out
      </button>
    </div>
  )
}