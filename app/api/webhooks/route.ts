import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '@/convex/_generated/api'


export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
  

    if (evt.type === 'user.created' || evt.type === 'user.updated') {
      const data = evt.data

      await convex.mutation(api.users.createUser, {
        clerkId: data.id,
        fullname: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
        pfp: data.image_url || '',
        username: data.username || '',
        email: data.email_addresses?.[0]?.email_address || '',
      })

      console.log('User created with email : '+ data.email_addresses?.[0]?.email_address)
    }

    if (evt.type === 'user.deleted') {
       await convex.mutation(api.users.deleteUser,{
        clerkId: evt.data.id || '',
       })
        console.log('User deleted with clerkId : '+ evt.data.id)
    }

    if(evt.type === 'user.updated'){
       await convex.mutation(api.users.updateUser,{
        clerkId: evt.data.id,
        fullname: `${evt.data.first_name || ''} ${evt.data.last_name || ''}`.trim(),
        pfp: evt.data.image_url || '',
        username: evt.data.username || '',
        email: evt.data.email_addresses?.[0]?.email_address || '',
       })
        console.log('User updated with email : '+ evt.data.email_addresses?.[0]?.email_address)
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}
