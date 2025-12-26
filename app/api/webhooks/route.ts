import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '@/convex/_generated/api'


export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
    console.log(evt.data)
    if (evt.type === 'user.created' || evt.type === 'user.updated') {
      const data = evt.data

      console.log('creating USER .....')
      await convex.mutation(api.users.createUser, {
        clerkId: data.id,
        fullname: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
        pfp: data.image_url || '',
        username: data.username || '',
        email: data.email_addresses?.[0]?.email_address || '',
      })

      return new Response('User created successfully', { status: 200 })
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}
