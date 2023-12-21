import React from 'react';
import Link from '@docusaurus/Link';

function SDK({ icon, to, name }: { icon: string; name: string; to?: string }) {
  return (
    <Link
      to={to}
      className="flex cursor-pointer items-center rounded-lg border border-secondary-700 p-2.5 text-inherit hover:border-primary hover:text-primary hover:no-underline"
    >
      <img src={icon} className="mr-2 h-7 w-7" />
      <span className="font-medium">{name}</span>
    </Link>
  );
}

export default function SDKs() {
  return (
   <section className='w-full px-4 flex-1 bg-gradient-to-b from-transparent to-pink-50'>
     <div className="mx-auto flex w-full max-w-screen-2xl flex-col p-4 py-0">
      <span className="mb-2 uppercase tracking-wider text-text-400">
        Documentation
      </span>

      <h3 className="mb-12  text-4xl">
      我们设计工具来揭开你的超能力
      </h3>

      <div>
        <h4 className="mb-2 text-2xl">UI Kit</h4>

        <p className="mb-6 text-text-400">
        使用我们预构建的UI组件库更快地构建，可用于所有框架。
          <span className="font-semibold">all</span> frameworks.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <SDK
            name="React"
            to="/react-ui-kit"
            icon="/static/landing-page/sdk-icons/react.png"
          />
          <SDK
            name="Angular"
            to="/angular-ui-kit"
            icon="/static/landing-page/sdk-icons/angular.png"
          />
          <SDK
            name="HTML"
            to="/ui-kit"
            icon="/static/landing-page/sdk-icons/html.png"
          />
          <SDK
            name="Flutter"
            to="/flutter"
            icon="/static/landing-page/sdk-icons/flutter.png"
          />
          <SDK
            name="React Native"
            to="/react-native"
            icon="/static/landing-page/sdk-icons/react.png"
          />
          <SDK
            name="iOS"
            to="/ios"
            icon="/static/landing-page/sdk-icons/swift.png"
          />
          <SDK
            name="Android"
            to="/android"
            icon="/static/landing-page/sdk-icons/kotlin.png"
          />
        </div>
      </div>
    </div>
   </section>
  );
}
