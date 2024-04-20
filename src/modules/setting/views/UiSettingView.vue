<script setup lang="ts">
import BIcon from '@/components/BIcon.vue';
import type { BIconName } from '@/components/types/BIcon';
import { ref } from 'vue';
import ProfilePage from '../components/ProfilePage.vue';
import type { User } from '@/utils/apis/models/model';

type Menu = 'profile' | 'car' | 'unit'

const currentMenu = ref<Menu>('profile')

const menus: {
	icon: BIconName,
	title: string,
	menu: Menu,
}[] =[
	{
		title: 'Profil',
		icon: 'person',
		menu: 'profile'
	},
	{
		title: 'Data Mobil',
		icon: 'directions_car',
		menu: 'car',
	},
	{
		title: 'Data Satuan',
		icon: 'inventory_2',
		menu: 'unit',
	}
]

</script>
<template>
	<div class="tw-flex tw-gap-8">
		<ul class="card tw-w-64 tw-p-2 tw-self-start">
			<li
				v-for="menu in menus"
				:key="menu.menu"
				class="tw-flex tw-items-center tw-gap-4 tw-p-4 tw-mb-4 last:tw-mb-0 tw-cursor-pointer tw-rounded-lg tw-text-sm tw-text-onSurfaceVariant"
				:class="currentMenu == menu.menu ? 'tw-bg-surfaceBright tw-text-onSurface tw-font-semibold' : '' "
				@click="currentMenu = menu.menu"
			>
				<BIcon :icon="menu.icon" :filled="currentMenu == menu.menu"/>
				<span>{{ menu.title }}</span>	
			</li>
		</ul>
		<div class="tw-flex-grow">
			<ProfilePage v-if="currentMenu == 'profile'"/>
		</div>
	</div>
</template>