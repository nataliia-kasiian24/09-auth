import { ReactNode } from 'react';

export default function NotesLayout ({
children,
sidebar,
}: {
children: ReactNode;
sidebar: ReactNode;
}) {
return (
<div style={{ display: 'flex', minHeight: '100vh' }}>
<aside style={{ width: '250px', flexShrink: 0 }}>
{sidebar}
    </aside>
    <main style={{ flex: 1, padding: '20px' }}>
      {children}
    </main>
    
</div>
);
}