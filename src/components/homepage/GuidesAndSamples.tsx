import React from 'react';
import Link from '@docusaurus/Link';
import {
  AppsAddInRegular,
  ArrowRightFilled,
  DocumentRegular,
  OpenRegular,
  RecordRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import clsx from 'clsx';
import { ChevronRight, GitHub } from 'react-feather';

interface Guide {
  title: string;
  icon: any;
  text: string;
  link: string;
}

const guides: Guide[] = [
  {
    title: 'Start Recording a Meeting',
    icon: RecordRegular,
    text: 'Check out an example of this integration of recording a meeting.',
    link: '/guides/capabilities/recording',
  },
  {
    title: 'Migrate from Twilio',
    icon: VideoRegular,
    text: 'Migration simplified. Refer the guide.',
    link: '/guides/migration/twilio/concepts-twilio-vs-dyte',
  },
  {
    title: 'Create a Breakout Room',
    icon: AppsAddInRegular,
    text: 'Easily split a meeting in separate sessions.',
    link: '/guides/capabilities/breakoutroom/create-breakout-rooms',
  },
];

interface Sample {
  title: string;
  platform?: string;
  source?: string;
  blog?: string;
  demo?: string;
}

const samples: Sample[] = [
  {
    title: 'Code Sharing Platform',
    platform: 'React',
    source: 'https://github.com/dyte-io/blog-live-code-sharing',
    blog: 'https://dyte.io/blog/live-code-sharing-platform/',
    demo: 'https://dyte-code-editor.herokuapp.com/room/bbbf8c1f-5eee-4548-90e6-54c1301711cb',
  },
  {
    title: 'Async Interview Platform',
    platform: 'React',
    blog: 'https://dyte.io/blog/async-interview-platform/',
    source: 'https://github.com/dyte-io/async-interview',
    demo: 'https://dyte-async-interview.vercel.app',
  },
  {
    title: 'Live Proctoring System',
    platform: 'React',
    blog: 'https://dyte.io/blog/live-proctoring-system/',
    source: 'https://github.com/dyte-io/proctored-live-interviews',
    demo: 'https://dyte-multi-faces.netlify.app/',
  },
];

export default function Guide({ title, text, icon: Icon, link }: (typeof guides)[0]) {
  return (
   <h2 className='border-none text-center mt-24  text-4xl font-bold'>我们设计工具来揭开你的超能力</h2>
  );
}
