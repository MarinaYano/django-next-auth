from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

User = get_user_model()

class UserAdminCustom(UserAdmin):
    model = User
    fieldsets = (
        (None, {
            'fields': (
                'uid',
                'name',
                'email',
                'password',
                'avatar',
                'introduction',
                'is_active',
                'is_staff',
                'is_superuser',
                'created_at',
                'updated_at',
            )
        }),
    )
    add_fieldsets = (
        (
            None,
            {
                'classes': ('wide',),
                'fields': (
                    'email',
                    'name',
                    'password1',
                    'password2',
                    'is_active',
                    'is_staff',
                    'is_superuser',
                ),
            }
        ),
    )
    list_display = (
        'uid',
        'name',
        'email',
        'is_active',
        'updated_at',
        'created_at',
      )
    list_filter = ()
    search_fields = ('uid', 'email')
    ordering = ('updated_at',)
    list_display_links = ('uid', 'name', 'email')
    readonly_fields = ('updated_at', 'created_at', 'uid')

admin.site.register(User, UserAdminCustom)