import { ISubscriptionEntity } from '../../../domain/entities/ISubscriptionEntity';
import { ISubscriptionRepository } from '../../../domain/repositories/ISubscription.repo';
import { IResponse } from '../../../types/IResponse';
import { mockSubscriptions } from '../../mock/subscription.mock';
import { simulateDelay } from '../../utils/simulateDelay';

export const mockSubscriptionRepository = {
	create: async (data: ISubscriptionEntity) => {
		const newSubscription = {
			...data,
			id: crypto.randomUUID(),
			created_at: new Date().toISOString(),
		};
		mockSubscriptions.push(newSubscription);

		return {
			success: true,
			message: 'Subscription created successfully',
			data: newSubscription,
		};
	},

	getAll: async (userId?: string) => {
		const filteredSubscriptions = userId
			? mockSubscriptions.filter((sub) => sub.user_id === userId)
			: mockSubscriptions;

		return {
			success: true,
			message: 'Subscriptions retrieved successfully',
			data: filteredSubscriptions,
		};
	},

	getById: async (subscriptionId: string) => {
		const subscription = mockSubscriptions.find(
			(sub) => sub.id === subscriptionId,
		);

		if (!subscription) {
			return {
				success: false,
				message: 'Subscription not found',
				data: undefined,
			};
		}

		return {
			success: true,
			message: 'Subscription retrieved successfully',
			data: subscription,
		};
	},
	update: async (data: ISubscriptionEntity) => {
		await simulateDelay(500);

		const index = mockSubscriptions.findIndex((sub) => sub.id === data.id);
		if (index === -1) {
			return {
				message: 'Subscription not found',
				success: false,
			};
		}

		mockSubscriptions[index] = {
			...mockSubscriptions[index],
			...data,
			updated_at: new Date().toISOString(),
		};

		const updatedUser = mockSubscriptions[index];

		return {
			message: 'Subscription updated successfully',
			success: true,
			data: {
				id: updatedUser.id,
				user_id: updatedUser.user_id,
				created_at: updatedUser.created_at,
				updated_at: updatedUser.updated_at,
			},
		};
	},

	delete: async (subscriptionId: string) => {
		const subscriptionIndex = mockSubscriptions.findIndex(
			(sub) => sub.id === subscriptionId,
		);

		if (subscriptionIndex === -1) {
			return {
				success: false,
				message: 'Subscription not found',
				data: undefined,
			};
		}

		mockSubscriptions.splice(subscriptionIndex, 1);

		return {
			success: true,
			message: 'Subscription deleted successfully',
			data: undefined,
		};
	},
};
