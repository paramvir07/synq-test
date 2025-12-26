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

      await convex.action(api.users.UpsertUserClerkWebhook, {
        clerkId: data.id,
        fullname: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
        pfp: data.image_url || undefined,
        username: data.username || '',
        email: data.email_addresses?.[0]?.email_address || '',
      })
    }

    if (evt.type === 'user.deleted') {
       await convex.mutation(api.users.deleteUser,{
        clerkId: evt.data.id || '',
       })
        console.log('User deleted with clerkId : '+ evt.data.id)
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}
