<script lang="ts">
	import { goto } from '$app/navigation';
	import { AppwriteService, type Category } from '$lib/AppwriteService';
	import { authStore } from '$lib/stores/authStore';
	import { modalStore } from '$lib/stores/modalStore';
  import { profileStore } from '$lib/stores/profileStore';
	import { onDestroy } from 'svelte';

	const modals: {
		[key: string]: {
			title: string;
			action: string;
		};
	} = {
		changePassword: {
			title: 'Change Password',
			action: 'Save Changes'
		},
		editAccount: {
			title: 'Edit Account',
			action: 'Save Changes'
		},
		addArticle: {
			title: 'Add Article',
			action: 'Generate'
		}
	};

	let isLoading = false;

	let oldPassword = '';
	let password = '';
	let passwordAgain = '';

	let fullName = '';
	let profileBio = '';
	let email = '';
	let twitter = '';

	let categories: Category[] = [];
	let title = '';
	let category = '';

	let error = '';

	const unsub1 = profileStore.subscribe((snapshot) => {
		fullName = snapshot?.name ?? '';
		profileBio = snapshot?.bio ?? '';
		twitter = snapshot?.twitter ?? '';
		email = snapshot?.email ?? '';
	});
	const unsub2 = modalStore.subscribe(async (snapshot) => {
		isLoading = false;
		error = '';

		if (snapshot?.type === 'addArticle') {
			if (categories.length <= 0) {
				categories = (await AppwriteService.listCategories()).documents;
			}
		}
	});
	onDestroy(() => {
		unsub1();
		unsub2();
	});

	async function onSubmit() {
		if (isLoading) {
			return;
		}

		isLoading = true;

		if ($modalStore?.type === 'changePassword') {
			if (password !== passwordAgain) {
				error = 'Passwords do not match.';
				return;
			}

			try {
				await AppwriteService.changePassword(oldPassword, password);
				error = '';
				$modalStore = null;

				oldPassword = '';
				password = '';
				passwordAgain = '';
			} catch (err: any) {
				error = err.message;
			} finally {
				isLoading = false;
			}
		} else if ($modalStore?.type === 'editAccount') {
			try {
				$profileStore = await AppwriteService.updateProfile($profileStore?.$id ?? '', {
					name: fullName,
					bio: profileBio,
					email: email,
					twitter: twitter
				});

				error = '';
				$modalStore = null;
			} catch (err: any) {
				error = err.message;
			} finally {
				isLoading = false;
			}
		} else if ($modalStore?.type === 'addArticle') {
			try {
				const res = await AppwriteService.generateArticle(title, category);

				const json = JSON.parse(res.response);
				const url = `/article/${json.id}`;

				error = '';
				$modalStore = null;

				title = '';
				category = '';

				goto(url);
			} catch (err: any) {
				console.log(err);
				error = err.message;
			} finally {
				isLoading = false;
			}
		}
	}
</script>

{#if $modalStore}
	<div class="modal-wrapper">
		<div class="modal">
			<form class="modal-form" on:submit|preventDefault={onSubmit}>
				<header class="modal-header">
					<div class="u-flex u-gap-16 u-main-space-between">
						<h4 class="heading-level-3">{modals[$modalStore.type]?.title ?? ''}</h4>
						<button
							type="button"
							on:click={() => ($modalStore = null)}
							class=""
							aria-label="Close modal"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								fill="#000000"
								height="15px"
								width="15px"
								version="1.1"
								id="Capa_1"
								viewBox="0 0 460.775 460.775"
								xml:space="preserve"
							>
								<path
									d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
								/>
							</svg>
						</button>
					</div>
				</header>
				<div class="modal-content">
					{#if $modalStore.type === 'changePassword'}
						<ul class="form-list">
							<li class="form-item">
								<input
									required={true}
									bind:value={oldPassword}
									class="input-text"
									type="password"
									placeholder="Old Password"
									aria-label="Old Password"
								/>
							</li>
							<li class="form-item">
								<input
									required={true}
									bind:value={password}
									class="input-text"
									type="password"
									placeholder="New Password"
									aria-label="Password"
								/>
							</li>
							<li class="form-item">
								<input
									required={true}
									bind:value={passwordAgain}
									class="input-text"
									type="password"
									placeholder="New Password Again"
									aria-label="Repeat Password"
								/>
							</li>
						</ul>
					{:else if $modalStore.type === 'editAccount'}
						<ul class="form-list">
							<li class="form-item">
								<input
									required={false}
									bind:value={fullName}
									class="input-text"
									type="text"
									placeholder="Full Name"
									aria-label="Full Name"
								/>
							</li>
							<li class="form-item">
								<input
									required={false}
									bind:value={email}
									class="input-text"
									type="email"
									placeholder="E-mail"
									aria-label="E-mail"
								/>
							</li>
							<li class="form-item u-flex u-cross-end u-gap-4">
								<span>@</span>
								<input
									required={false}
									bind:value={twitter}
									class="input-text"
									type="text"
									placeholder="Twitter"
									aria-label="Twitter"
								/>
							</li>
							<li class="form-item">
								<textarea
									required={false}
									bind:value={profileBio}
									style="block-size: auto;"
									rows="3"
									class="input-text"
									placeholder="Profile Bio"
									aria-label="Profile Bio"
								/>
							</li>
						</ul>
					{:else if $modalStore.type === 'addArticle'}
						<ul class="form-list">
							<li class="form-item">
								<input
									bind:value={title}
									class="input-text"
									type="text"
									required={true}
									placeholder="Article Title"
									aria-label="Article Title"
								/>
							</li>
							<li class="form-item">
								<label for="cars">Category:</label>
								<div class="u-margin-block-start-8">
									<select class="input-text" required={true} bind:value={category}>
										<option selected disabled value="">Select Category</option>
										{#each categories as category}
											<option value={category.$id}>{category.name}</option>
										{/each}
									</select>
								</div>
							</li>
						</ul>
					{/if}
				</div>
				<div class="modal-footer">
					<div class="u-flex u-main-end u-gap-16">
						<button type="submit" class="button is-text">
							{#if isLoading}
								<div class="lds-ring">
									<div />
									<div />
									<div />
									<div />
								</div>
							{:else}
								<span class="text">{modals[$modalStore.type]?.action ?? 'Save'}</span>
							{/if}
						</button>
					</div>
					{#if error}
						<p class="u-text-end u-color-text-danger">{error}</p>
					{/if}
				</div>
			</form>
		</div>
	</div>
{/if}
